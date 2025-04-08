import { FightWithUpdatedAtDistance } from "../types/fight";

export default function fightsListItem(fight: FightWithUpdatedAtDistance) {
  return `
        <article>
            <a href="/fights/${fight.fight_id}">
                <h2>${fight.title}</h2>
            </a>
            <div class="author">
                <a href="#">${fight.author_name}</a>
            </div>
            <div class="stats">
                <span>Replies:&nbsp;0</span>
                <span>Upvotes:&nbsp;${fight.upvotes}</span>
                <span>Last post:&nbsp;${fight.updated_at_distance}</span>
            </div>
        </article>  
    `;
}
