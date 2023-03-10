export default function responseModel(message: string, data = {}) {
  return {
    message,
    data,
  };
}
