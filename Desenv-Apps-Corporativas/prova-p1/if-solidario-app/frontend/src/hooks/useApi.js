import { useCallback, useEffect, useState } from "react";

/**
 * Carrega dados da API e expõe estado de carregamento/erro e uma função de recarga.
 * @template T
 * @param {() => Promise<T>} loader Função que busca os dados (deve ser estável, ex.: useCallback).
 * @returns {{ data: T|null, error: string, loading: boolean, reload: () => Promise<void> }}
 */
export function useApi(loader) {
  const [state, setState] = useState({ data: null, error: "", loading: true });

  const load = useCallback(
    () =>
      loader().then(
        (data) => ({ data, error: "", loading: false }),
        (err) => ({ data: null, error: err.message, loading: false }),
      ),
    [loader],
  );

  useEffect(() => {
    let active = true;
    load().then((next) => active && setState(next));
    return () => {
      active = false;
    };
  }, [load]);

  const reload = useCallback(() => load().then(setState), [load]);

  return { ...state, reload };
}
