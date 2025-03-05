import { Request, Response, NextFunction } from 'express';
import { UAParser } from 'ua-parser-js';

const clientInfoParser = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const parser = new UAParser();
  parser.setUA(userAgent);
  const parsedUA = parser.getResult();

  req.body.clientInfo = {
    device: parsedUA.device.type || 'pc',
    browser: parsedUA.browser.name || 'Unknown',
    ipAddress: req.ip || req.headers['x-forwarded-for'] || 'Unknown',
    pcName: req.headers['host'] || '',
    os: parsedUA.os.name || 'Unknown',
    userAgent: userAgent,
  };

  next();
};

export default clientInfoParser;
