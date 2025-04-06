import { FightWithUpdatedAtDistance } from "../types/fight";
import fightsListItem from "./fightsListItem";

export default function fightsList(
  fights: FightWithUpdatedAtDistance[],
  newFight = false,
) {
  const hasFights = fights.length > 0;

  return `
        <main>
            ${
              !hasFights
                ? `<p class="empty">No fights</p>`
                : `
                    ${newFight ? `<p class="new-fight">New fight created</p>` : ""}
                    <p>Hottest fights:</p>
                    <div>
                        ${fights.map(fightsListItem).join(" ")}
                    </div>
                `
            }
        </main>
    `;
}
