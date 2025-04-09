import { Fight } from "../types/fight";
import fightsListItem from "./fightsListItem";

export default function fightsList(fights: Fight[], newFight = false) {
  const hasFights = fights.length > 0;

  return !hasFights
    ? `<p class="empty">No fights</p>`
    : `
        ${newFight ? `<p class="new-fight-info">New fight created</p>` : ""}
        <p>Hottest fights:</p>
        <div>
            ${fights.map(fightsListItem).join(" ")}
        </div>
      `;
}
