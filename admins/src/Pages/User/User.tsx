import { JSX, useState, MouseEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import style from './User.module.scss';
import { UserDetails } from '@containers';
import { Modal, Next, NoteModal, userNote, UserNotes } from '@components';
import { bgColors, colors, generateRandom } from '@utils';

const uN: userNote[] = [
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
  {
    id: '78d34823-9469-4e17-a509-c44c380430b1',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },

  {
    id: '12',
    title: 'head',
    createdAt: new Date(),
    content:
      'This ius the content we want to do for this page and it would be a non mess hopefully',
  },
];

export function User(): JSX.Element {
  const { userId } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<userNote>({
    content: '',
    createdAt: new Date(),
    id: '',
    title: '',
  });

  const [i, setI] = useState<number>(-1);

  useEffect(() => {
    setI(generateRandom());
  }, []);

  const clickHandler = (note: userNote) => {
    setIsOpen(true);
    setSelectedNote(note);
  };

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  console.log({ userId, bgggg: colors[i], melon: bgColors[i], i });

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
            createdAt={new Date()}
            email={'email@gmail.com'}
            username={'melon'}
            index={i}
          />
        </div>

        <div>
          <UserNotes notes={uN} onClick={clickHandler} />
        </div>

        <div className={style.more}>
          <Next />
        </div>
      </div>
    </div>
  );
}
