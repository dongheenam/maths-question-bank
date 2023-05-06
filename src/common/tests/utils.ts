import { render } from '@testing-library/react';

export const renderAsyncComponent = async <P extends Record<any, any>>(
  Component: (props: P) => Promise<JSX.Element>,
  props: P
) => {
  const PageComponent = await Component(props);
  return render(PageComponent);
};
