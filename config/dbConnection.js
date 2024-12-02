import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb+srv://surajs:surajs@cluster0.cvbtg.mongodb.net/?retryWrites=true&w=majority';
class DBConnection {
  static client;

  static async connect() {
    if (!DBConnection.client) {
      DBConnection.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }

    try {
      // Connect the client to the server
      await DBConnection.client.connect();
      // Send a ping to confirm a successful connection
      await DBConnection.client.db('admin').command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error; // Rethrow the error to be caught in server.js
    }
  }

  static async close() {
    if (DBConnection.client) {
      await DBConnection.client.close();
      console.log('MongoDB connection closed.');
    }
  }
}

export default DBConnection;