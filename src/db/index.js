import mongoose from 'mongoose'
import DatabaseConfig from '../../config/database.json'

mongoose.Promise = Promise;
mongoose.connect(DatabaseConfig.url);

export default mongoose; 
