import { hackathonValidationSchema } from '../validator-schema/hackathonValidation.js';
import { HackathonService } from './hackathon.service.js';
import express from 'express';
import { checkSchema, validationResult } from 'express-validator';

export const hackathonRouter = express.Router();

//get all hackathon

hackathonRouter.get('/', async (_, res) => {
  try {
    const hackathon = await HackathonService.getAllHackathons();
    res.status(200).send({ success: true, hackathon: hackathon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

//get hackathon by id

hackathonRouter.get(
  '/id/:id',
  checkSchema(hackathonValidationSchema.idSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.params;

      const hackathon = await HackathonService.getHackathonsById(id);
      res.status(200).send({ success: true, hackathon: hackathon });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);

//get hackathon by slug

hackathonRouter.get(
  '/slug/:slug',
  checkSchema(hackathonValidationSchema.slugSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { slug } = req.params;

      const hackathon = await HackathonService.getHackathonsBySlug(slug);
      res.status(200).send({ success: true, hackathon: hackathon });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);

//create hackathon
hackathonRouter.post(
  '/create',
  checkSchema(hackathonValidationSchema.createHackathonSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const data = req.body;
      const hackathon = await HackathonService.createHackathon(data);
      res.status(200).send({ success: true, hackathon: hackathon });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
);

//update hackathon
hackathonRouter.post(
  '/update/:id',
  checkSchema(hackathonValidationSchema.createHackathonSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.params;
      const data = req.body;

      const hackathon = await HackathonService.updateHackathon(id, data);
      res.status(200).send({ success: true, hackathon: hackathon });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);

//delete hackathon by id

hackathonRouter.post(
  '/delete',
  checkSchema(hackathonValidationSchema.deleteSchema),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array(),
        });
      }
      const { id } = req.body;
      const hackathon = await HackathonService.deleteHackathon(id);
      res.status(200).send({ success: true, hackathon: hackathon });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
);
