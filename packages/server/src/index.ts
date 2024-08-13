import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";

import CONFIGS from "./server-configs";

const app = express();
app.use(cors());
const PORT = 5000;

const {
  API: {
    ENDPOINTS: { V4: API_V4 },
    RESOURCES: {
      COMPETITIONS: { WORLD_CUP },
      TEAMS,
    },
    API_KEY,
  },
} = CONFIGS;

const teamsUrl = `${API_V4}/${WORLD_CUP}/${TEAMS}`;

app.get("/apis/teams", async (_req: Request, res: Response) => {
  try {
    const { data } = await axios.get(teamsUrl, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    return res.json({ response: data });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(PORT, () =>
  console.log(`The World Cup server is running on port ${PORT}`)
);
