import { validationSchema } from '../validator-schema/validationSchema';
import { EventService } from './event.service';
import * as express from 'express';
import { Request, Response } from 'express';
import { checkSchema, validationResult } from 'express-validator';

export const eventRouter = express.Router();

interface RequestParams {
  id: string;
  slug: string;
}
//get all events
eventRouter.get('/', async (_, res: Response) => {
  try {
    const events = await EventService.getAllEvents();
    res.status(200).send({ success: true, events: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
//get first event value
eventRouter.get('/first', async (req: Request, res: Response) => {
  try {
    const events = await EventService.getFirstEvent();
    res.status(200).send({ success: true, events: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
//get event by id
eventRouter.get(
  '/id/:id',
  checkSchema(validationSchema.idSchema),
  async (req: Request<RequestParams>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.params;
      if (!id) {
        res
          .status(422)
          .send({ success: false, message: 'Invalid id parameter' });
      }

      const events = await EventService.getEventsById(id);
      res.status(200).send({ success: true, events: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);

//get event by slug
eventRouter.get(
  '/slug/:slug',
  checkSchema(validationSchema.slugSchema),
  async (req: Request<RequestParams>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { slug } = req.params;

      const events = await EventService.getEventsBySlug(slug);
      res.status(200).send({ success: true, events: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);

//add event
eventRouter.post(
  '/create',
  checkSchema(validationSchema.createSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const data = req.body;
      const events = await EventService.createEvent(data);
      res.status(200).send({ success: true, events: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);
//update events
eventRouter.post(
  '/update/:id',
  checkSchema(validationSchema.createSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.params;
      const data = req.body;

      const events = await EventService.updateEvent(id, data);
      res.status(200).send({ success: true, events: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);
//delete event by id

eventRouter.post(
  '/delete',
  checkSchema(validationSchema.deleteSchema),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.body;

      const events = await EventService.deleteEvent(id);
      res.status(200).send({ success: true, events: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);
