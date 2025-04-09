import { Fight } from "../types/fight";
import { getDistanceFromNow } from "../utils/date";

export default function fightsListItem(fight: Fight) {
  return `
        <article>
            <a href="/fights/${fight.fight_id}">
                <h2>${fight.title}</h2>
            </a>
            <div class="author">
                <a href="#"><strong>${fight.author_name}</strong></a>
            </div>
            <div class="stats">
                <span>Replies:&nbsp;0</span>
                <span>Upvotes:&nbsp;${fight.upvotes}</span>
                <span>Last post:&nbsp;${getDistanceFromNow(fight.updated_at)}</span>
            </div>
        </article>  
    `;
}
