export default function newFightForm(defaultAuthorName: string) {
  return `
        <form action="/" method="POST">
            <h3>Author</h3>
            <div class="author">
                <label>
                    <p>Name</p>
                    <input name="name" placeholder="${defaultAuthorName}" maxlength=30 />
                </label>
                <label>
                    <p>Secret</p>
                    <input name="secret" maxlength=50 type="password" />
                </label>
            </div>
            <p>Name + Secret: Your YellFest Identity</p>
            <h3>Fight</h3>
            <label>
                <p class="required">Title</p>
                <input name="title" maxlength=100 required />
            </label>
            <label>
                <p class="required">Body</p>
                <textarea name="body" maxlength=2000 required ></textarea>
            </label>
            <button type="submit" class="cta-button">Post</button>
        </form>
    `;
}
