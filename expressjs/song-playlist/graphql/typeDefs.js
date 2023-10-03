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
  }

  type Mutation {
    login(input: InputLogin): LoginResponse
    register(input: InputRegister): User

    updateSongById(song_id: String!, input: SongRequest!): Song
    createSong(input: SongRequest!): Song
    deleteSongById(song_id: String!): Song

    updatePlaylistById(playlist_id: String!, input: PlaylistRequest!): Playlist
    createPlaylist(input: PlaylistRequest!): Playlist
    deletePlaylistById(playlist_id: String!): Playlist
    addSongToPlaylist(playlist_id: String!, input: InputSongs): Playlist
    removeSongFromPlaylist(playlist_id: String!, song_id: String!): Playlist
  }
`;

exports.publicOperations = ['public'];
