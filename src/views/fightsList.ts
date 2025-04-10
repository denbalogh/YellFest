import { Fight } from "../types/fight";
import fightsListItem from "./fightsListItem";

export default function fightsList(fights: Fight[]) {
  if (fights.length === 0) {
    return `<p class="empty">No fights</p>`;
  }

  return `
    <div>
      ${fights.map(fightsListItem).join(" ")}
    </div>
  `;
}
