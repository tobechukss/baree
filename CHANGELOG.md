 Changelog
All notable changes to this project will be documented in this file.


## [Unreleased]

## [1.0.0] - 2021-06-18
### Added
- Created UI for app's frontend using react
- Added sign in with google function
- Added sign out function to ensure user account safety
- installed firebase to help with user authentication
- linked app to firestore database collection
- wrote functions to enable app interact with firestore data base.
- function is able to upload image provided by the user into database, show the picture on the front end, and delete picture
- began with back end cloud function using google vision api

## [1.0.1] - 2021-06-19
### Added
- Function using google vision API and firebase functions to assess a photo and present an array containing the photos labels. This can be found in the functuon file in the index.js
- If-else statement was added on the frontend to parse through the labels the vision api provided and decide based on the features of the picture whether it's a face or not
- Added picture firestore which would be rendered if user uploads image that is not a face
### Changed
- Changed the url for the google logo from firebase to make it display