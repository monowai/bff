import { defaultTo, find, identity, pipe, prop } from "ramda";
import chalk from "chalk";

export const toColoredStatusCode = (req: Request, res: Response) => {
  const status = res.status;

  const codesMapping = [
    { code: 500, color: chalk.red },
    { code: 400, color: chalk.yellow },
    { code: 300, color: chalk.cyan },
    { code: 200, color: chalk.green }
  ];

  const color = pipe(
    // @ts-ignore
    find(mapping => status >= mapping.code),
    defaultTo({ color: identity }),
    // @ts-ignore
    prop("color")
  )(codesMapping);

  return res.headers ? color(status) : "";
};
