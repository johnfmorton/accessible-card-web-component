# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-13

### Security

- Added `rel="noopener noreferrer"` to external links with `target="_blank"` to prevent tabnabbing attacks
- Added validation for `title-tag-type` attribute to only allow valid heading tags (h1-h6)

### Fixed

- Fixed memory leak by properly removing `slotchange` event listener in `disconnectedCallback`
- Fixed fragile URL domain parsing by using the URL API instead of string splitting
- Fixed inconsistent empty string validation for `cta-url` and `cta-text` attributes
- Fixed TypeScript config to point to correct `lib/` directory instead of `src/`
- Fixed GitHub Actions workflow: removed duplicate `setup-node` calls and updated to Node.js 20.x
- Fixed `String` type annotation to lowercase `string` for TypeScript best practices
- Removed debug `console.log` statements from production code
- Fixed typos: "combile" to "combine", "templare" to "template"

### Changed

- Renamed `img-scr` attribute to `img-src` (correct spelling). Legacy `img-scr` still works for backwards compatibility.
- Updated GitHub Actions from `actions/checkout@v3` and `actions/setup-node@v3` to v4
- Updated CI/CD to use Node.js 20.x (previously 14.x which is EOL)

### Added

- Comprehensive README documentation with installation, usage, and API reference

## [1.0.0] - 2023-03-04

- Cleaned up documentation.
- Publishing version 1 after testing the workflow.

## [1.0.0-alpha.1] - 2023-03-01

### Added

- Added `CHANGELOG.md` file. Sorry for the delay on this one, if you've been watching this as it has gone through development. I'll try to keep this up to date from now on. We're still in an alpha state, so breaking changes will still happen, but I will document them here.
