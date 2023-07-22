import tw from 'tailwind-styled-components';

interface PageHeadingProps {
  children?: React.ReactNode;
}

const Container = tw.div`mx-auto max-w-7xl px-4 sm:px-6 md:px-8`;

export const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  return (
    <Container>
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight p-4">
          {children}
        </h2>
      </div>
      <div className="my-6 border-b border-gray-200"></div>
    </Container>
  );
};

interface PageContentProps {
  children?: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
