import { Fight } from "../types/fight";

export function replyForm(fight: Fight, newUserName: string) {
  return `
    <hr>
    <h3>Yell back!</h3>
    <form action="/fights/${fight.fight_id}" method="POST">
        <div class="author">
            <label>
                <p>Name</p>
                <input name="name" placeholder="${newUserName}" maxlength=30 />
            </label>
            <label>
                <p>Secret (Name + Secret: Your YellFest Identity)</p>
                <input name="secret" maxlength=50 type="password" />
            </label>
        </div>
        <label>
            <p>Reply</p>
            <textarea name="body" maxlength=2000 required ></textarea>
        </label>
        <button type="submit" class="cta-button">Post</button>
    </form>
    `;
}
