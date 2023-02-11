let logs = Array<[number, string]>();

function loger(type: keyof typeof console, msg: Error | string) {
  const log = (type: keyof typeof console, msg: Error | string) => {
    const log = `[Devutnia] - ${type}: ${msg instanceof Error ? msg?.message : msg}`;
    logs.push([new Date().getTime(), log]);
    return log;
  };

  switch (type) {
    case 'error':
      console.error(log(type, msg));
      if (msg instanceof Error) throw msg;
      break;
    case 'info':
      console.info(log(type, msg));
      break;
    case 'warn':
      console.warn(log(type, msg));
      break;
    default:
      console.log(log('log', msg));
      break;
  }
}
/** Returns a copy of all logs */
loger.readLogs = () => [...logs];

/** Clears the log list */
loger.clearLogs = () => void (logs = Array());

export { loger };
