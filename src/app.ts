import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import headhunterRoutes from './routes/headhunter.routes';
import specialRoutes from './routes/special.routes';
import talentRoutes from './routes/talent.routes';
import contractRoutes from './routes/contract.routes';
import projectRoutes from './routes/project.routes';
import speeddateRoutes from './routes/speeddate.routes';
import recordRoutes from './routes/record.routes';

// Initializations

const app = express();

// Settings

app.set('port', process.env.PORT || 3000);

// Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the HeadHunter API');
});

app.use(talentRoutes);
app.use(specialRoutes);
app.use(headhunterRoutes);
app.use(contractRoutes);
app.use(projectRoutes);
app.use(speeddateRoutes);
app.use(recordRoutes);

export default app;
