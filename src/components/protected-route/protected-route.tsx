import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import {getUser} from "../../services/actions/auth";
//import {useDispatch, useSelector} from "react-redux";
import { useSelector, useDispatch } from '../../types/hooks';
import {TRootState} from "../../services/reducers";

interface IProtectedRouteProps extends React.HTMLAttributes<Element> {
    children: React.ReactNode,
    path: string,
    exact: boolean
}

export function ProtectedRoute({ children, ...rest }: IProtectedRouteProps) {
  const dispatch = useDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
    const auth = useSelector((store:TRootState) =>
        store.auth
    );

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
      return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
