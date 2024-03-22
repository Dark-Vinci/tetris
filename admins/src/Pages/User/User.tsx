import { JSX, useEffect, useState, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import style from './User.module.scss';
import { UserDetails } from '@containers';
import { Modal, Next, NoteModal, userNote, UserNotes } from '@components';
import {
  AUTH_TOKEN,
  bgColors,
  Color,
  colors,
  formatToken,
  generateRandom,
  REACT_APP_API_ENDPOINT,
  SIZE,
} from '@utils';

interface userType {
  id: string;
  createdAt: Date;
  username: string;
  email: string;
}

export function User(): JSX.Element {
  const { userId } = useParams();
  const nav = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<userNote>({
    id: '',
    title: '',
    createdAt: new Date(),
    content: '',
  });
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState<userType>({
    id: '',
    createdAt: new Date(),
    username: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [i, setI] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setI(generateRandom());

    if (!userId) {
      nav('/users');
    }

    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
      nav('/login');
    }

    Promise.all([fetchUser(token!), fetchUserNotes(token!)]).then();
  }, []);

  const clickHandler = (note: userNote) => {
    setIsOpen(true);
    setSelectedNote(note);
  };

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  const fetchUserNotes = async (token: string) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${REACT_APP_API_ENDPOINT}/note/${userId}/user`,
        {
          headers: {
            Authorization: formatToken(token),
          },
          params: {
            size: SIZE,
          },
        },
      );

      setNotes(response.data.data.items);
    } catch (e) {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (token: string) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${REACT_APP_API_ENDPOINT}/user/${userId}`,
        {
          headers: {
            Authorization: formatToken(token),
          },
        },
      );

      setUser(response.data.data);
    } catch (e) {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ClipLoader
          color={Color.MINOR}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '37px', fontWeight: 'bold', color: 'red' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {isOpen && (
        <div
          className={style.modal}
          onClick={(e) => closeModal(e)}
          style={{ backgroundColor: bgColors[i] }}
        >
          <Modal
            isOpen={isOpen}
            children={
              <NoteModal
                bgColor={colors[i]}
                content={selectedNote?.content}
                createdAt={selectedNote?.createdAt}
                id={selectedNote?.id}
                title={selectedNote?.title}
              />
            }
          />
        </div>
      )}

      <div className={style.container_minor}>
        <div>
          <UserDetails
            createdAt={user?.createdAt}
            email={user?.email}
            username={user?.username}
            index={i}
          />
        </div>

        <div>{<UserNotes notes={notes} onClick={clickHandler} />}</div>

        <div className={style.more}>
          <Next hasNext={false} hasPrev={false} />
        </div>
      </div>
    </div>
  );
}
