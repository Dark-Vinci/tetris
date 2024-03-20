import { JSX } from 'react';
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';

import style from './Next.module.scss';

export function Next(): JSX.Element {
  return (
    <div className={style.container}>
      <div>
        <div>
          <RxTrackPrevious size="40px" color="white" />
        </div>
        <div>
          <RxTrackNext size="40px" color="white" />
        </div>
      </div>
    </div>
  );
}
