import { useNavigate } from 'react-router-dom';

import { routes } from '@config/routes';

interface IProps {
  children: React.ReactNode;
}

export const Layout: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="bg-sky-900 py-8"
        onClick={() => {
          navigate(routes.CONTACTS);
        }}
      >
        <h1 className="text-4xl text-center text-yellow-100">
          Contact App v0.2.6
        </h1>
      </div>
      <div className="bg-slate-200 mx-auto">{children}</div>
    </>
  );
};
