#!/usr/bin/env swift
import AppKit
import Foundation

struct FrameConfig {
    let imagePath: String
    let screenX: CGFloat
    let screenY: CGFloat
    let screenWidth: CGFloat
    let screenHeight: CGFloat
    let cornerRadius: CGFloat
}

let projectRoot = URL(fileURLWithPath: #filePath).deletingLastPathComponent().deletingLastPathComponent()
let thisdayRoot = URL(fileURLWithPath: "/Users/raykim/Desktop/Development/thisday")
let slidesToolRoot = URL(fileURLWithPath: "/Users/raykim/Desktop/Development/app-store-slides-tool")

let rawScreenshotRoot = thisdayRoot
    .appendingPathComponent("build/AppStore/v1.10.1/en_US/iphone/raw")
let assetsRoot = projectRoot.appendingPathComponent("assets/images")
let devicesRoot = assetsRoot.appendingPathComponent("devices")

let iphoneFrame = FrameConfig(
    imagePath: slidesToolRoot.appendingPathComponent("Assets/Frames/iPhone 17 Pro - Deep Blue - Portrait.png").path,
    screenX: 72,
    screenY: 69,
    screenWidth: 1206,
    screenHeight: 2622,
    cornerRadius: 68
)

func loadImage(_ path: String) throws -> NSImage {
    guard FileManager.default.fileExists(atPath: path) else {
        throw NSError(domain: "prepare-assets", code: 1, userInfo: [NSLocalizedDescriptionKey: "Missing file: \(path)"])
    }
    guard let image = NSImage(contentsOfFile: path) else {
        throw NSError(domain: "prepare-assets", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not load: \(path)"])
    }
    if let rep = image.representations.first {
        image.size = NSSize(width: rep.pixelsWide, height: rep.pixelsHigh)
    }
    return image
}

func pngData(from image: NSImage) throws -> Data {
    guard let tiff = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff),
          let data = bitmap.representation(using: .png, properties: [:]) else {
        throw NSError(domain: "prepare-assets", code: 3, userInfo: [NSLocalizedDescriptionKey: "PNG encode failed"])
    }
    return data
}

func compositeDevice(screenshot: NSImage, frame: NSImage, config: FrameConfig) throws -> NSImage {
    let frameSize = frame.size
    let width = Int(frameSize.width.rounded())
    let height = Int(frameSize.height.rounded())

    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
        throw NSError(domain: "prepare-assets", code: 4, userInfo: [NSLocalizedDescriptionKey: "Bitmap allocation failed"])
    }

    let previous = NSGraphicsContext.current
    NSGraphicsContext.current = context
    defer {
        context.flushGraphics()
        NSGraphicsContext.current = previous
    }

    NSColor.clear.setFill()
    NSRect(origin: .zero, size: frameSize).fill()

    let screenRect = NSRect(
        x: config.screenX,
        y: frameSize.height - config.screenY - config.screenHeight,
        width: config.screenWidth,
        height: config.screenHeight
    )

    NSGraphicsContext.saveGraphicsState()
    NSBezierPath(roundedRect: screenRect, xRadius: config.cornerRadius, yRadius: config.cornerRadius).addClip()
    screenshot.draw(in: screenRect, from: .zero, operation: .sourceOver, fraction: 1)
    NSGraphicsContext.restoreGraphicsState()
    frame.draw(in: NSRect(origin: .zero, size: frameSize), from: .zero, operation: .sourceOver, fraction: 1)

    let output = NSImage(size: frameSize)
    output.addRepresentation(bitmap)
    return output
}

func makeIconTransparent(source: URL, destination: URL) throws {
    let image = try loadImage(source.path)
    let width = Int(image.size.width.rounded())
    let height = Int(image.size.height.rounded())

    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: width,
        pixelsHigh: height,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ), let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
        throw NSError(domain: "prepare-assets", code: 5, userInfo: [NSLocalizedDescriptionKey: "Icon bitmap failed"])
    }

    let previous = NSGraphicsContext.current
    NSGraphicsContext.current = context
    defer {
        context.flushGraphics()
        NSGraphicsContext.current = previous
    }

    NSColor.clear.setFill()
    NSRect(x: 0, y: 0, width: width, height: height).fill()
    image.draw(in: NSRect(x: 0, y: 0, width: width, height: height), from: .zero, operation: .sourceOver, fraction: 1)

    guard let data = bitmap.bitmapData else { return }
    let threshold: UInt8 = 36
    for y in 0..<height {
        for x in 0..<width {
            let offset = (y * bitmap.bytesPerRow) + (x * 4)
            let r = data[offset]
            let g = data[offset + 1]
            let b = data[offset + 2]
            if r < threshold && g < threshold && b < threshold {
                data[offset + 3] = 0
            }
        }
    }

    let output = NSImage(size: image.size)
    output.addRepresentation(bitmap)
    try pngData(from: output).write(to: destination, options: .atomic)
}

func writeFramedScreenshot(rawName: String, outputName: String) throws {
    let screenshot = try loadImage(rawScreenshotRoot.appendingPathComponent(rawName).path)
    let frame = try loadImage(iphoneFrame.imagePath)
    let composite = try compositeDevice(screenshot: screenshot, frame: frame, config: iphoneFrame)
    let outputURL = devicesRoot.appendingPathComponent(outputName)
    try pngData(from: composite).write(to: outputURL, options: .atomic)
    print("Wrote \(outputURL.path)")
}

do {
    try FileManager.default.createDirectory(at: devicesRoot, withIntermediateDirectories: true)

    let iconSource = projectRoot.appendingPathComponent("assets/images/app-icon.png")
    try makeIconTransparent(source: iconSource, destination: iconSource)

    let framed: [(String, String)] = [
        ("01-gallery-multiselect.png", "hero-gallery.png"),
        ("01-gallery-multiselect.png", "feature-daily-review.png"),
        ("02-live-photos-convert.png", "feature-live-photos.png"),
        ("03-duplicates-review.png", "feature-duplicates.png"),
        ("04-settings-daily-reminders.png", "feature-reminders.png"),
        ("05-achieve-milestones.png", "feature-milestones.png"),
        ("06-relive-memories.png", "feature-memories.png"),
        ("01-gallery-multiselect.png", "how-open-memories.png"),
        ("03-duplicates-review.png", "how-review-delete.png"),
        ("04-settings-daily-reminders.png", "how-daily-habit.png")
    ]

    for (raw, output) in framed {
        try writeFramedScreenshot(rawName: raw, outputName: output)
    }
} catch {
    fputs("error: \(error.localizedDescription)\n", stderr)
    exit(1)
}
