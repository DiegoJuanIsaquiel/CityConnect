
export function getErrorMessage({ status, error, message }: any): string {
  if (status === 503)
    return (
      error?.message ||
      'Ocorreu um erro inesperado, por favor, experimente atualizar a página e tentar novamente.'
    );

  if (status >= 500 && status <= 599)
    return 'Ocorreu um erro inesperado, por favor, experimente atualizar a página e tentar novamente.';

  if (!error) {
    if (Array.isArray(message)) return message[0];

    return (
      message ||
      'Ocorreu um erro inesperado, por favor, experimente atualizar a página e tentar novamente.'
    );
  }

  if (!Array.isArray(error.message)) {
    if (typeof error.message === 'string' && error.message.includes('Cannot'))
      return 'A rota especificada não foi encontrada, por favor, contate os administradores se o erro persistir.';

    return (
      error.message ||
      'Ocorreu um erro inesperado, por favor, experimente atualizar a página e tentar novamente.'
    );
  }

  if (error.message.every((message: any) => typeof message === 'string'))
    return error.message[0];

  // @ts-ignore
  return error.message
    .map(({ constraints }: any) => (constraints && Object.values(constraints)) || [])
    .reduce((acc: any, actual: any) => [...acc, ...actual] as string[])[0];
}