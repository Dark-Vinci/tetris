import { JSX } from 'react';
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';

import style from './Next.module.scss';

interface nextProps {
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export function Next({ hasNext, hasPrev }: nextProps): JSX.Element {
  return (
    <div className={style.container}>
      <div>
        <div style={{ opacity: hasPrev ? 1 : 0.5 }}>
          <RxTrackPrevious size="40px" color="white" />
        </div>
        <div style={{ opacity: hasNext ? 1 : 0.5 }}>
          <RxTrackNext size="40px" color="white" />
        </div>
      </div>
    </div>
  );
}
