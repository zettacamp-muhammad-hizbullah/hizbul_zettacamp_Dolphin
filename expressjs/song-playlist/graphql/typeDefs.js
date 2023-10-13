const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  type Song {
    _id: ID!
    title: String
    genre: [String]
    playlist: Playlist
    artist: String
    duration: Int
  }
  type Playlist {
    _id: ID!
    name: String
    songs: [Song]
  }
  type User {
    _id: ID!
    username: String
    first_name: String
    last_name: String
  }
  type LoginResponse {
    token: String
    user: User
  }
  type PlaylistResponse {
    playlist_name: String!
    songs: [Song]!
    start_at: String
    end_at: String
    total_duration: String
  }
  type SongWebhookResponse {
    song_name: String
    duration: String
    artist: String
    genre: String
    album: String
  }
  type PlaylistWebhookResponse {
    playlist_name: String
    description: String
    creator: String
    total_favorite: String
    song_list: [SongWebhookResponse]
  }
  type WebhookResponse {
    message: String
    status: String
    data: [PlaylistWebhookResponse]
  }

  input InputLogin {
    username: String!
    password: String!
  }
  input InputRegister {
    username: String!
    password: String!
    first_name: String!
    last_name: String!
  }
  input SongRequest {
    title: String!
    artist: String!
    duration: Int!
    playlist: String
    genre: [String]!
  }
  input PlaylistRequest {
    name: String!
    songs: [String]
  }
  input InputSongs {
    songs: [String]!
  }
  input InputSongWebhook {
    song_name: String
    duration: String
    artist: String
    genre: String
    album: String
  }
  input InputPlaylistWebhook {
    playlist_name: String
    description: String
    creator: String
    total_favorite: String
    song_list: [InputSongWebhook]
  }

  type Query {
    me: User!

    getAllUser: [User]!

    getSongs(page: Int, perPage: Int): [Song]!
    getAllSong: [Song]!
    getSong(song_id: String!): Song!

    getPlaylists(page: Int, perPage: Int): [Playlist]!
    getAllPlaylist: [Playlist]!
    getPlaylist(playlist_id: String!): Playlist!
    getPlaylistRandom(maxSecond: Int!): [Song]!

    getAllPlaylistWithDuration: [PlaylistResponse]
    getOnePlaylistWithDuration(playlist_id: String!): PlaylistResponse
    getPlaylistsByArtistWithDuration: [PlaylistResponse]
    getPlaylistsByGenreWithDuration: [PlaylistResponse]
    getPlaylistRandomWithDuration(maxSecond: Int): PlaylistResponse
  }

  type Mutation {
    createPlaylistWebhook(input: InputPlaylistWebhook): WebhookResponse
    createMultiplePlaylistWebhook(input: [InputPlaylistWebhook]): WebhookResponse

    login(input: InputLogin): LoginResponse
    register(input: InputRegister): User

    updateSongById(song_id: String!, input: SongRequest!): Song
    createSong(input: SongRequest!): Song
    deleteSongById(song_id: String!): Song
    resetIsPlayedStatusAllSong: Boolean

    updatePlaylistById(playlist_id: String!, input: PlaylistRequest!): Playlist
    createPlaylist(input: PlaylistRequest!): Playlist
    deletePlaylistById(playlist_id: String!): Playlist
    addSongToPlaylist(playlist_id: String!, input: InputSongs): Playlist
    removeSongFromPlaylist(playlist_id: String!, song_id: String!): Playlist
  }
`;

exports.publicOperations = ['public'];
