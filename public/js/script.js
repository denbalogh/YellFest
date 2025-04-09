addEventListener("DOMContentLoaded", () => {
  const formWrapperClass = "inserted-reply-form";

  // Toggling reply form under comment
  document.querySelectorAll(".bite-back-button").forEach((el) => {
    el.addEventListener("click", function () {
      const articleEl = this.parentNode.parentNode;
      const wrapperEl = articleEl.parentNode;

      // Remove form if exists
      const replyForm = wrapperEl.querySelector(`.${formWrapperClass}`);
      if (replyForm) {
        return replyForm.remove();
      }

      const fightId = articleEl.getAttribute("data-fight-id");
      const replyId = articleEl.getAttribute("data-reply-id");
      const newUserName = articleEl.getAttribute("data-new-user-name");

      // Create form if doesn't exist
      const div = document.createElement("div");
      div.setAttribute("class", formWrapperClass);
      div.innerHTML = `
        <form action="/fights/${fightId}" method="POST">
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
            <input type="hidden" name="parent_reply_id" value="${replyId}" />
            <button type="submit" class="cta-button">Post</button>
        </form>  
      `;
      wrapperEl.append(div);
    });
  });
});
