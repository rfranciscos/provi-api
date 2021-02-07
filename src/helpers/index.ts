import { Request, Router } from 'express';

export interface RouterList {
  path: string;
  nextPath: string;
}

export const getRouterList = (req: Request): RouterList[] => {
  const router = req.app._router as Router;
  const paths = router.stack.reduce((acc, item) => {
    if (item.route) {
      const path = item.route.path;
      if (path.includes('v1') && !path.includes('auth')) {
        acc.push(path);
      }
    }
    return acc;
  }, []);

  return paths.map((path, index) => {
    let nextPath = index + 1;
    console.log(paths.length);

    if (paths.length - 1 < nextPath) nextPath = 0;
    return { path, nextPath: paths[nextPath] };
  });
};
