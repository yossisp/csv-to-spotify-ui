# README

### About

This is a frontend for this [csv-to-spotify server](https://github.com/yossisp/csv-to-spotify). It allows you to upload a CSV file where each row has song and artist information and afterwards the songs are added to a playlist in your Spotify account. The playlist name is the same is the file name which will be uploaded.

The CSV format is:

- The header row with the first column containing song name, the second column containing artist name.
- The file must comma-separated.

The application requires connection to Spotify account, in particular the following scopes will be requested: playlist-modify-public, playlist-modify-private, playlist-read-private, playlist-read-collaborative. You can learn more about Spotify scopes [here](https://developer.spotify.com/documentation/general/guides/scopes/#scopes). The application **doesn't request or collect user email**.

The application is based on [`next-auth`](https://github.com/iaincollins/next-auth), an open source, easy to use, and secure by default authentication library.

## How to use

Copy the `.env.local.example` file in this directory to `.env.local` and populate it with your Spotify client id and client secret details.

Dockerized application can be built by running `npm run docker-build` and run by `npm run docker-run`.
