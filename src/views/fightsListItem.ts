import { FightWithUpdatedAtDistance } from "../types/fight";

export default function fightsListItem(fight: FightWithUpdatedAtDistance) {
  return `
        <article>
            <a href="#">
                <h2>${fight.title}</h2>
            </a>
            <a href="#" class="author">${fight.author_name}</a>
            <div class="stats">
                <span>Replies: 0</span>
                <span>Upvotes: ${fight.upvotes}</span>
                <span>Last post: ${fight.updated_at_distance}</span>
            </div>
        </article>  
    `;
}
