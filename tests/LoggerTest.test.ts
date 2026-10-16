import { expect, beforeEach, describe, it } from 'vitest';
import {
  ApplicationLogger, LoggerFunction, LoggerLevel, Logger,
} from '../src';

describe('Logger', () => {
  type LastLog = {
    level: LoggerLevel,
    loggerName: string,
    message: string,
    args: any[],
  };
  let lastLog: LastLog | undefined;
  const loggerFunctionTest: LoggerFunction = (level: LoggerLevel, loggerName: string, message: string, ...args: any[]) => {
    lastLog = {
      level,
      loggerName,
      message,
      args,
    };
    ApplicationLogger.loggerConsole(level, loggerName, message, ...args);
  };
  ApplicationLogger.setLoggerFunction(loggerFunctionTest);

  beforeEach(() => {
    lastLog = undefined;
  });

  describe('Logger level', () => {
    const testLogger = (loggerLevel: LoggerLevel) => {
      expect(lastLog).not.toBeUndefined();
      if (lastLog) {
        expect(lastLog.loggerName).toEqual('Test');
        expect(lastLog.level).toEqual(loggerLevel);
        expect(lastLog.message).toEqual('Message');
        expect(lastLog.args).toEqual([]);
      }
    };
    it('Logger info', () => {
      const logger = new Logger('Test');
      logger.info('Message');
      testLogger(LoggerLevel.INFO);
    });
    it('Logger debug', () => {
      const logger = new Logger('Test');
      logger.debug('Message');
      testLogger(LoggerLevel.DEBUG);
    });
    it('Logger warn', () => {
      const logger = new Logger('Test');
      logger.warn('Message');
      testLogger(LoggerLevel.WARN);
    });
    it('Logger error', () => {
      const logger = new Logger('Test');
      logger.error('Message');
      testLogger(LoggerLevel.ERROR);
    });
  });

  describe('Logger arguments', () => {
    it('1 argument', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg');
      expect(lastLog).not.toBeUndefined();
      if (lastLog) {
        expect(lastLog.message).toEqual('Message');
        expect(lastLog.args).toEqual(['1st arg']);
      }
    });
    it('2 arguments', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg', '2nd arg');
      expect(lastLog).not.toBeUndefined();
      if (lastLog) {
        expect(lastLog.message).toEqual('Message');
        expect(lastLog.args).toEqual(['1st arg', '2nd arg']);
      }
    });
    it('3 arguments', () => {
      const logger = new Logger('Test');
      logger.info('Message', '1st arg', '2nd arg', { a: '3' });
      expect(lastLog).not.toBeUndefined();
      if (lastLog) {
        expect(lastLog.message).toEqual('Message');
        expect(lastLog.args).toEqual(['1st arg', '2nd arg', { a: '3' }]);
      }
    });
  });

  describe('Logger generic log', () => {
    it('generic 3 arguments', () => {
      const logger = new Logger('Test');
      logger.log(LoggerLevel.DEBUG, 'Message', '1st arg', '2nd arg', { a: '3' });
      expect(lastLog).not.toBeUndefined();
      if (lastLog) {
        expect(lastLog.message).toEqual('Message');
        expect(lastLog.args).toEqual(['1st arg', '2nd arg', { a: '3' }]);
      }
    });
  });
});
