import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getUser} from "../../services/actions/auth";
import {useSelector} from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const [isUserLoaded, setUserLoaded] = useState(false);
    const auth = useSelector(store =>
        store.auth
    );

  const init = async () => {
    await getUser();
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
