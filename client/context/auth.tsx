import axios from 'axios';
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { IUser } from '../interfaces';

interface State {
  authenticated: boolean;
  user: IUser | undefined;
  loading: boolean;
}

type Action =
  | {
      type: 'LOGIN';
      payload: IUser;
    }
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'STOP_LOADING';
    };

const initialState = {
  authenticated: false,
  user: undefined,
  loading: true,
};

const StateContext = createContext<State>(initialState);

const DispatchContext = createContext<Dispatch<Action>>({} as Dispatch<Action>);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        authenticated: false,
        user: undefined,
      };
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        loading: false,
      };
    }
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/me');
        dispatch({ type: 'LOGIN', payload: data });
        dispatch({ type: 'STOP_LOADING' });
      } catch (error) {
        console.log(error);
         dispatch({ type: 'STOP_LOADING' });
      }
    };
    fetchUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
