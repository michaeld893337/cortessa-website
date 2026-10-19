/* Share controls for the sector films. No external services or dependencies. */
(function () {
  "use strict";

  var CANONICAL_PAGE = "https://cortessa.co.uk/sectors.html";
  var buttons = document.querySelectorAll(".sector-film__share");

  function announce(button, message) {
    var status = button.parentElement.querySelector(".sector-film__share-status");
    if (!status) return;
    status.textContent = "";
    window.requestAnimationFrame(function () {
      status.textContent = message;
    });
  }

  function copyWithSelection(value) {
    var temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.className = "sector-film__copy-source";
    document.body.appendChild(temporary);
    temporary.select();

    var copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    temporary.remove();
    return copied;
  }

  function exposeLink(button, url) {
    var tools = button.parentElement;
    var existing = tools.querySelector(".sector-film__manual-share");
    var input;

    if (existing) {
      input = existing.querySelector("input");
      existing.hidden = false;
    } else {
      var wrapper = document.createElement("div");
      var label = document.createElement("label");
      input = document.createElement("input");
      var inputId = button.closest(".sector-film").id + "-share-link";

      wrapper.className = "sector-film__manual-share";
      label.setAttribute("for", inputId);
      label.textContent = "Share link";
      input.id = inputId;
      input.type = "url";
      input.readOnly = true;
      input.value = url;
      wrapper.appendChild(label);
      wrapper.appendChild(input);
      tools.appendChild(wrapper);
    }

    input.focus();
    input.select();
    input.setSelectionRange(0, input.value.length);
    announce(button, "Copy the selected link.");
  }

  async function copyOrExpose(button, url) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        announce(button, "Link copied.");
        return;
      } catch (error) {
        // Continue to the selection-based fallbacks.
      }
    }

    if (copyWithSelection(url)) {
      announce(button, "Link copied.");
      return;
    }

    exposeLink(button, url);
  }

  async function shareFilm(button) {
    var figure = button.closest(".sector-film");
    var destination = figure.closest("[id]");
    var url = CANONICAL_PAGE + "#" + destination.id;
    var shareData = {
      title: button.dataset.shareTitle,
      text: button.dataset.shareText,
      url: url
    };

    button.disabled = true;
    try {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          announce(button, "Shared.");
          return;
        } catch (error) {
          if (error.name === "AbortError") {
            announce(button, "Share cancelled.");
            return;
          }
        }
      }

      await copyOrExpose(button, url);
    } finally {
      button.disabled = false;
    }
  }

  buttons.forEach(function (button) {
    button.hidden = false;
    button.setAttribute(
      "aria-label",
      "Share " + button.dataset.shareTitle.replace(" — Cortessa sector film", " sector film")
    );
    button.addEventListener("click", function () {
      shareFilm(button);
    });
  });
})();
