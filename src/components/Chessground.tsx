import React, { useEffect, useRef, useState } from "react";
import { Chessground as ChessgroundApi } from "chessground";

import { Api } from "chessground/api";
import { Config } from "chessground/config";
import { Chess } from "chess.js";

interface Props {
  width?: number;
  height?: number;
  contained?: boolean;
  config?: Config;
  update: (params: CgActionParams) => void;
}

interface CgActionParams {
  config?: Config;
  initializer?: initFn;
}

type initFn = (api: Api) => void;

function Chessground({ width = 900, height = 900, config = {}, contained = false }: Props) {
  const [api, setApi] = useState<Api | null>(null);
  const [chess] = useState(new Chess());

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Chessground useEffect", chess.moves());
    if (ref?.current && !api) {
      const chessgroundApi = ChessgroundApi(ref.current, {
        animation: { enabled: true, duration: 200 },
        ...config,
      });
      setApi(chessgroundApi);
    } else if (ref?.current && api) {
      api.set(config);
    }
  }, [ref]);

  useEffect(() => {
    api?.set(config);
  }, [api, config]);

  return (
    <div style={{ height: contained ? "100%" : height, width: contained ? "100%" : width }}>
      <div ref={ref} style={{ height: "100%", width: "100%", display: "table" }} />
    </div>
  );
}

export default Chessground;
