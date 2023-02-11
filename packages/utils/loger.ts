export function loger(type: keyof typeof console, msg: Error | string) {
  const timestamped = (type: keyof typeof console, msg: Error | string) => {
    return `[Devutnia@${new Date().toLocaleTimeString()}] - ${type}: ${
      msg instanceof Error ? msg?.message : msg
    }`;
  };

  switch (type) {
    case 'error':
      if (msg instanceof Error) throw msg;
      console.error(timestamped(type, msg));
      break;
    case 'info':
      console.info(timestamped(type, msg));
      break;
    case 'warn':
      console.warn(timestamped(type, msg));
      break;
    default:
      console.log(timestamped('log', msg));
      break;
  }
}
