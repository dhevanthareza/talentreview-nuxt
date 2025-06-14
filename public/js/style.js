const initializeStyle = () => {
  const body = document.body,
    root = document.getElementById("root");
  document.querySelectorAll("[data-view]").forEach((t) => {
    t.addEventListener("click", (e) => {
      t.targetEl ||
        ((e =
          e.target.closest(e.target.getAttribute("data-view-target")) ||
          document.querySelector(e.target.getAttribute("data-view-target"))),
        (t.targetEl = e)),
        "fullscreen" == t.getAttribute("data-view")
          ? t.classList.contains("active")
            ? t.targetEl.requestFullscreen
              ? t.targetEl.requestFullscreen()
              : t.targetEl.webkitRequestFullscreen &&
                t.targetEl.webkitRequestFullscreen()
            : document.exitFullscreen
            ? document.exitFullscreen()
            : document.webkitExitFullscreen && document.webkitExitFullscreen()
          : (t.targetEl.classList.toggle("content-full-page"),
            body.classList.toggle("body-sc"));
    });
  }),
    document
      .querySelectorAll(".btn-close-card")
      .forEach((t) =>
        t.addEventListener("click", (e) => t.closest(".card").remove())
      ),
    document.querySelectorAll(".nav-toggler").forEach((e) => {
      e.addEventListener("click", () => {
        window.innerWidth < 992 ||
        (!root.classList.contains("mn--min") &&
          !root.classList.contains("mn--max"))
          ? root.classList.toggle("mn--show")
          : (root.classList.toggle("mn--min"),
            root.classList.toggle("mn--max"));
      });
    }),
    document.querySelectorAll(".sidebar-toggler").forEach((e) => {
      e.addEventListener("click", () => root.classList.toggle("sb--show"));
    }),
    document.addEventListener("click", (e) => {
      e.target.classList.contains("root") &&
        (root.classList.remove("mn--show"),
        root.classList.contains("sb-stuck") ||
          root.classList.remove("sb--show"));
    });
  const mainNav = document.getElementById("mainnav-container");
  let isMiniNav = null,
    miniNavTogglers = null,
    miniNavContents = null,
    miniNavContentsCollapse = null;
  mainNav &&
    ((isMiniNav = root.classList.contains("mn--min")),
    (miniNavTogglers = [...mainNav.querySelectorAll(".mininav-toggle")]),
    (miniNavContents = [...mainNav.querySelectorAll(".mininav-content")]),
    mainNav.addEventListener("transitionend", (e) => {
      e.target.classList.contains("mainnav") &&
        "max-width" == e.propertyName &&
        buildNav();
    }),
    (miniNavContentsCollapse = miniNavContents.map((e) => {
      if (
        e.parentElement.querySelector(".mininav-toggle.active") &&
        (!isMiniNav || window.innerWidth < 992)
      ) {
        const n = e.parentElement;
        n.classList.add("open");
        var t = new bootstrap.Collapse(e, {
          toggle: !0,
        });
        return (
          e.addEventListener(
            "transitionend",
            () => n.classList.remove("open"),
            {
              once: !0,
            }
          ),
          t
        );
      }
      return new bootstrap.Collapse(e, {
        toggle: !1,
      });
    })));
  const popperOptions = {
      placement: "right-start",
      strategy: "fixed",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 2],
          },
        },
      ],
    },
    updateNav = () => {
      (miniNavTogglers = [...mainNav.querySelectorAll(".mininav-toggle")]),
        (miniNavContents = [...mainNav.querySelectorAll(".mininav-content")]),
        buildNav();
    },
    addVariables = (e) => {
      const t = e.parentElement.querySelector(".mininav-content");
      (e._mainnav = {
        target: t,
        islink: e.parentElement.classList.contains("has-sub"),
        collapse: (function () {
          for (var e of miniNavContentsCollapse) if (e._element === t) return e;
        })(),
      }),
        (e._mainnav.target.toggler = e)._mainnav.target.addEventListener(
          "show.bs.collapse",
          bsCollapseShow
        ),
        e._mainnav.target.addEventListener("shown.bs.collapse", bsCollapseShow);
    },
    bsCollapseHide = (e) => {
      e.target.classList.contains("mininav-content") &&
        (!isMiniNav || window.innerWidth < 992
          ? e.target.toggler.classList.add("collapsed")
          : e.target.removeEventListener("hide.bs.collapse", bsCollapseHide));
    },
    bsCollapseShow = (e) => {
      if (e.target.classList.contains("mininav-content"))
        if (!isMiniNav || window.innerWidth < 992)
          e.target.toggler.classList.remove("collapsed");
        else
          try {
            e.target.popper.update();
          } catch (e) {}
    },
    hideAllMiniNavContent = (e) => {
      992 <= window.innerWidth &&
        (!mainNav.contains(e.target) ||
          e.target.classList.contains("mainnav__top-content")) &&
        miniNavContentsCollapse.map((e) => e.hide());
    },
    toggleContent = (e) => {
      if (
        !e.target._mainnav.target.classList.contains("nav-label") ||
        (isMiniNav && !(window.innerWidth < 992))
      ) {
        const t = e.target._mainnav;
        t.islink && e.preventDefault(),
          miniNavContentsCollapse.map(async (e) => {
            e._element.contains(t.target) || e.hide();
          }),
          "mouseenter" == e.type ? t.collapse.show() : t.collapse.toggle(),
          ["click", "touchend"].forEach((e) =>
            document.addEventListener(e, hideAllMiniNavContent, {
              once: !0,
            })
          );
      }
    },
    buildNav = () => {
      isMiniNav = root.classList.contains("mn--min");
      let e = null;
      isMiniNav ||
        (e = mainNav.querySelector(
          ".has-sub > .mininav-toggle.nav-link.active + .mininav-content.nav"
        )),
        e && e.classList.add("show"),
        miniNavTogglers.map((t) => {
          t._mainnav || addVariables(t),
            t.classList.add("collapsed"),
            !isMiniNav || window.innerWidth < 992
              ? (t.addEventListener("click", toggleContent),
                ["mouseenter", "touchend"].forEach((e) =>
                  t.removeEventListener(e, toggleContent)
                ),
                null != t._mainnav.target.popper &&
                  (t._mainnav.target.popper.setOptions({
                    scroll: !1,
                    resize: !1,
                  }),
                  t._mainnav.target.popper.destroy()),
                t._mainnav.target.addEventListener(
                  "hide.bs.collapse",
                  bsCollapseHide
                ))
              : (miniNavContentsCollapse.map(async (e) => e.hide()),
                (t._mainnav.target.popper = Popper.createPopper(
                  t,
                  t._mainnav.target,
                  popperOptions
                )),
                t.removeEventListener("click", toggleContent),
                ["mouseenter", "touchend"].forEach((e) =>
                  t.addEventListener(e, toggleContent)
                ),
                t._mainnav.target.removeEventListener(
                  "hide.bs.collapse",
                  bsCollapseHide
                ));
        });
    };
  miniNavTogglers && buildNav();
  if (document.getElementById("_dm-boxedBgContent")) {
    const a = [...document.querySelectorAll("._dm-boxbg__thumb")];
    a.map((o) => {
      o.addEventListener("click", (t) => {
        if ((t.preventDefault(), !o.classList.contains(".active"))) {
          let e = document.querySelector("._dm-boxbg__thumb.active ");
          e && e.classList.remove("active"), o.classList.add("active");
          t = o
            .querySelector("img")
            .getAttribute("src")
            .replace("thumbs", "bg");
          body.style.backgroundImage = `url( ${t} )`;
        }
      });
    });
  }
  if (document.getElementById("_dm-settingsContainer")) {
    const f = {
      boxedLayoutRadio: document.getElementById("_dm-boxedLayoutRadio"),
      centeredLayoutRadio: document.getElementById("_dm-centeredLayoutRadio"),
      stickyHeaderCheckbox: document.getElementById("_dm-stickyHeaderCheckbox"),
      stickyNavCheckbox: document.getElementById("_dm-stickyNavCheckbox"),
      miniNavRadio: document.getElementById("_dm-miniNavRadio"),
      maxiNavRadio: document.getElementById("_dm-maxiNavRadio"),
      pushNavRadio: document.getElementById("_dm-pushNavRadio"),
      slideNavRadio: document.getElementById("_dm-slideNavRadio"),
      revealNavRadio: document.getElementById("_dm-revealNavRadio"),
      disableBackdropCheckbox: document.getElementById(
        "_dm-disableBackdropCheckbox"
      ),
      stuckSidebarCheckbox: document.getElementById("_dm-stuckSidebarCheckbox"),
      pinnedSidebarCheckbox: document.getElementById(
        "_dm-pinnedSidebarCheckbox"
      ),
      uniteSidebarCheckbox: document.getElementById("_dm-uniteSidebarCheckbox"),
    };
    (f.boxedLayoutRadio.checked = body.classList.contains("boxed-layout")),
      (f.centeredLayoutRadio.checked =
        body.classList.contains("centered-layout")),
      (f.stickyHeaderCheckbox.checked = root.classList.contains("hd--sticky")),
      (f.stickyNavCheckbox.checked = root.classList.contains("mn--sticky")),
      (f.miniNavRadio.checked = root.classList.contains("mn--min")),
      (f.maxiNavRadio.checked = root.classList.contains("mn--max")),
      (f.pushNavRadio.checked = root.classList.contains("mn--push")),
      (f.slideNavRadio.checked = root.classList.contains("mn--slide")),
      (f.revealNavRadio.checked = root.classList.contains("mn--reveal")),
      (f.disableBackdropCheckbox.checked = root.classList.contains("sb--bd-0")),
      (f.stuckSidebarCheckbox.checked = root.classList.contains("sb--stuck")),
      (f.pinnedSidebarCheckbox.checked = root.classList.contains("sb--pinned")),
      (f.uniteSidebarCheckbox.checked = root.classList.contains("sb--unite"));
    const g = document.getElementById("_dm-boxedBgBtn"),
      h = document.getElementById("_dm-boxedBgOption");
    f.boxedLayoutRadio.addEventListener("changed", (e) => {
      e.target.checked && !body.classList.contains("boxed-layout")
        ? (body.classList.add("boxed-layout"),
          h.classList.remove("opacity-50"),
          g.removeAttribute("disabled"))
        : (body.classList.remove("boxed-layout"),
          body.removeAttribute("style"),
          h.classList.add("opacity-50"),
          g.setAttribute("disabled", !0));
    }),
      f.centeredLayoutRadio.addEventListener("changed", () => {
        body.classList.toggle("centered-layout");
      }),
      document
        .getElementById("_dm-transtiionSelect")
        .addEventListener("change", (e) => {
          const t = e.target;
          t.querySelector("option[selected]").removeAttribute("selected"),
            t[t.selectedIndex].setAttribute("selected", !0),
            body.classList.remove(
              "in-quart",
              "out-quart",
              "in-back",
              "out-back",
              "in-out-back",
              "steps",
              "jumping",
              "rubber"
            ),
            body.classList.add(t.value);
        }),
      f.stickyHeaderCheckbox.addEventListener("change", () => {
        root.classList.toggle("hd--sticky");
      });
    const i = document.getElementById("_dm-offcanvas"),
      j = new bootstrap.Offcanvas(i),
      k = document.getElementById("_dm-settingsToggler"),
      l = document.getElementById("_dm-settingsContainer");
    [...document.querySelectorAll("._dm-offcanvasBtn")].map((e) => {
      e.addEventListener("click", () => {
        (i.className = `offcanvas ${e.value}`),
          (i.style = "transition-duration: 0s"),
          k.dispatchEvent(new Event("click")),
          l.addEventListener(
            "transitionend",
            () => {
              (i.style = ""), j.show();
            },
            {
              once: !0,
            }
          );
      });
    }),
      f.stickyNavCheckbox.addEventListener("change", () => {
        root.classList.toggle("mn--sticky");
      });
    const m = document.querySelector(".mainnav__profile");
    document
      .getElementById("_dm-profileWidgetCheckbox")
      .addEventListener("change", () => {
        m.classList.toggle("d-none");
      }),
      f.miniNavRadio.addEventListener("changed", () => {
        root.classList.toggle("mn--min");
      }),
      f.maxiNavRadio.addEventListener("changed", () => {
        root.classList.toggle("mn--max");
      });
    const n = (e) => {
      e && (root.classList.remove("mn--min", "mn--max"), buildNav());
    };
    f.pushNavRadio.addEventListener("changed", (e) => {
      n(e.target.checked), root.classList.toggle("mn--push");
    }),
      f.slideNavRadio.addEventListener("changed", (e) => {
        n(e.target.checked), root.classList.toggle("mn--slide");
      }),
      f.revealNavRadio.addEventListener("changed", (e) => {
        n(e.target.checked), root.classList.toggle("mn--reveal");
      }),
      f.disableBackdropCheckbox.addEventListener("change", () => {
        root.classList.toggle("sb--bd-0");
      }),
      document
        .getElementById("_dm-staticSidebarCheckbox")
        .addEventListener("change", () => {
          root.classList.toggle("sb--static");
        }),
      f.stuckSidebarCheckbox.addEventListener("change", () => {
        root.classList.toggle("sb--stuck");
      }),
      f.uniteSidebarCheckbox.addEventListener("change", () => {
        root.classList.toggle("sb--unite");
      }),
      f.pinnedSidebarCheckbox.addEventListener("change", () => {
        root.classList.toggle("sb--pinned");
      });
    const o = document.getElementById("dm_colorSchemesContainer"),
      p = [...o.querySelectorAll("._dm-themeColors")],
      q = new Event("scheme-changed"),
      r = (t) => {
        let o = null;
        return (
          [...document.getElementsByTagName("link")].map((e) =>
            e.href.includes(t) ? (o = e) : null
          ),
          "bootstrap" == t ? (bootstrapLinkEl = o) : (ecomLinkEl = o),
          o
        );
      },
      s = r("bootstrap.").getAttribute("href"),
      t = r("ecom.").getAttribute("href"),
      u = s.match(/^.*?assets/g).toString();
    let b = 0,
      v = 1,
      a = s.replace(/^.*color-schemes\/(.*)\/bootstrap.min.css/g, "$1");
    if (a != s) {
      o.querySelector("._dm-themeColors.active").classList.remove("active");
      let e = p.filter((e) => e.getAttribute("data-dir") === a);
      e.length && e[0].classList.add("active");
    }
    const y = (e) => {
        const t = document.createElement("link");
        return (
          t.setAttribute("rel", "stylesheet"),
          t.setAttribute("href", e),
          t.addEventListener("load", A, {
            once: !0,
          }),
          t
        );
      },
      z = (e, o) => {
        let a = `${u}/css/color-schemes/${e}/${o}.min.css`;
        return e.length <= 0 && (a = "bootstrap" == o ? s : t), a;
      },
      A = () => {
        if ((b++, !(b < v))) {
          bootstrap.Offcanvas.getInstance("#_dm-settingsContainer").hide(),
            body.classList.remove("_dm-load-scheme-css");
          const e = document.querySelector("#_dm-loading-screen");
          e && e.remove(), document.dispatchEvent(q);
        }
      };
    p.map((c) => {
      c.addEventListener("click", (t) => {
        if (!c.classList.contains("active")) {
          t.preventDefault();
          const a = c.getAttribute("data-hd"),
            n = document.querySelector("._dm-themeColors.active");
          t = r("bootstrap").getAttribute("href");
          let e = s;
          if (
            ((b = 0),
            (v = 1),
            c.getAttribute("data-single") ||
              (e = z(c.getAttribute("data-dir"), "bootstrap")),
            t != e)
          ) {
            v++,
              document.getElementById("_dm-customLoadScreen") ||
                document.head.insertAdjacentHTML(
                  "beforeend",
                  '<style id="_dm-customLoadScreen">._dm-load-scheme-css>._dm-loading-screen{align-items:center;background-color:#fff;color:#2b2c2d;display:flex;flex-direction:column;inset:0;justify-content:center;position:fixed}._dm-load-scheme-css>._dm-loading-screen:before{animation-duration:1s;animation-iteration-count:infinite;animation-name:_dm-spin;animation-timing-function:linear;color:#28292b;content:"⚆";display:block;font-family:Arial;font-size:5rem;height:2ex;line-height:1;opacity:.1;width:2ex;transform-origin:center center}._dm-load-scheme-css>._dm-loading-screen:after{content:"Please wait while loading . . .";font-family:Poppins,"Open Sans",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:700;line-height:1.5;margin-top:2rem}._dm-load-scheme-css>:not(._dm-loading-screen){opacity:0;pointer-events:none;visibility:none}@keyframes _dm-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}</style>'
                );
            const d = document.createElement("div");
            d.setAttribute("id", "_dm-loading-screen"),
              d.classList.add("_dm-loading-screen"),
              document.body.append(d),
              document.body.classList.add("_dm-load-scheme-css");
            var o = y(e);
            r("bootstrap.").parentNode.replaceChild(o, r("bootstrap."));
          }
          o = y(z(c.getAttribute("data-dir"), "ecom"));
          r("ecom.").parentNode.replaceChild(o, r("ecom.")),
            root.classList.remove("hd--expanded", "hd--fair"),
            null != a &&
              a.split(",").map((e) => {
                "border" != e && root.classList.add(`hd--${e}`);
              }),
            n && n.classList.remove("active"),
            c.classList.add("active");
        }
      });
    });
    let d, c;
    const D = {
        className: "os-ecom-minimal",
        scrollbars: {
          autoHide: "leave",
          clickScrolling: !0,
        },
        overflowBehavior: {
          x: "visible-scroll",
        },
      },
      E = () =>
        new Promise((t, o) => {
          if (document.getElementById("_dm-jsOverlayScrollbars")) t("done");
          else {
            let e = document.createElement("link");
            e.setAttribute("id", "_dm-cssOverlayScrollbars"),
              e.setAttribute("rel", "stylesheet"),
              e.setAttribute(
                "href",
                `${u}/vendors/overlayscrollbars/overlayscrollbars.min.css`
              ),
              document.querySelector("head").append(e),
              (e = document.createElement("script")),
              e.setAttribute("id", "_dm-jsOverlayScrollbars"),
              e.setAttribute(
                "src",
                `${u}/vendors/overlayscrollbars/OverlayScrollbars.min.js`
              ),
              document.body.append(e),
              e.addEventListener("load", t, {
                once: !0,
              }),
              (e.onerror = o);
          }
        });
    document
      .getElementById("_dm-bodyScrollbarCheckbox")
      .addEventListener("change", async (e) => {
        await E(),
          e.target.checked ? (d = OverlayScrollbars(body, D)) : d.destroy();
      }),
      document
        .getElementById("_dm-sidebarsScrollbarCheckbox")
        .addEventListener("change", async (e) => {
          await E(),
            e.target.checked
              ? (c = OverlayScrollbars(
                  document.querySelectorAll(".scrollable-content"),
                  D
                ))
              : c.map((e) => e.destroy());
        });
  }
  const radioEvent = new Event("changed");
  [
    ...document.querySelectorAll("#_dm-settingsContainer input[type='radio']"),
  ].map((t) => {
    (t.previous = t.checked),
      t.addEventListener("transitionend", (e) => {
        "background-color" == e.propertyName &&
          t.previous != t.checked &&
          ((t.previous = t.checked), e.target.dispatchEvent(radioEvent));
      });
  });

  function tagin(el, option = {}) {
    const classElement = "tagin",
      classWrapper = "tagin-wrapper",
      classTag = "tagin-tag",
      classRemove = "tagin-tag-remove",
      classInput = "tagin-input",
      classInputHidden = "tagin-input-hidden",
      defaultSeparator = ",",
      defaultDuplicate = "false",
      defaultTransform = (e) => e,
      defaultPlaceholder = "",
      separator = el.dataset.separator || option.separator || defaultSeparator,
      duplicate = el.dataset.duplicate || option.duplicate || defaultDuplicate,
      transform =
        eval(el.dataset.transform) || option.transform || defaultTransform,
      placeholder =
        el.dataset.placeholder || option.placeholder || defaultPlaceholder,
      templateTag = (e) =>
        `<span class="${classTag}">${e}<span class="${classRemove}"></span></span>`,
      getValue = () => el.value,
      getValues = () => getValue().split(separator);
    !(function () {
      const e = `<div class="${
        classWrapper + " " + el.className.replace(classElement, "").trim()
      }">${
        "" === getValue().trim() ? "" : getValues().map(templateTag).join("")
      }<input type="text" class="${classInput}" placeholder="${placeholder}"></div>`;
      el.insertAdjacentHTML("afterend", e);
    })();
    const wrapper = el.nextElementSibling,
      input = wrapper.getElementsByClassName(classInput)[0],
      getTags = () =>
        [...wrapper.getElementsByClassName(classTag)].map((e) => e.textContent),
      getTag = () => getTags().join(separator),
      updateValue = () => {
        (el.value = getTag()), el.dispatchEvent(new Event("change"));
      };
    function autowidth() {
      const e = document.createElement("div");
      e.classList.add(classInput, classInputHidden);
      const t = input.value || input.getAttribute("placeholder") || "";
      (e.innerHTML = t.replace(/ /g, "&nbsp;")),
        document.body.appendChild(e),
        input.style.setProperty(
          "width",
          Math.ceil(window.getComputedStyle(e).width.replace("px", "")) +
            1 +
            "px"
        ),
        e.remove();
    }
    function addTag(e = !1) {
      const t = transform(input.value.trim());
      "" === t && (input.value = ""),
        (input.value.includes(separator) || (e && "" != input.value)) &&
          (t
            .split(separator)
            .filter((e) => "" != e)
            .forEach((e) => {
              getTags().includes(e) && "false" === duplicate
                ? alertExist(e)
                : (input.insertAdjacentHTML("beforebegin", templateTag(e)),
                  updateValue());
            }),
          (input.value = ""),
          input.removeAttribute("style"));
    }
    function alertExist(e) {
      for (const t of wrapper.getElementsByClassName(classTag))
        t.textContent === e &&
          ((t.style.transform = "scale(1.09)"),
          setTimeout(() => {
            t.removeAttribute("style");
          }, 150));
    }
    function updateTag() {
      getValue() !== getTag() &&
        ([...wrapper.getElementsByClassName(classTag)].map((e) => e.remove()),
        "" !== getValue().trim() &&
          input.insertAdjacentHTML(
            "beforebegin",
            getValues().map(templateTag).join("")
          ));
    }
    function escapeRegex(e) {
      return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    wrapper.addEventListener("click", () => input.focus()),
      input.addEventListener("focus", () => wrapper.classList.add("focus")),
      input.addEventListener("blur", () => wrapper.classList.remove("focus")),
      document.addEventListener("click", (e) => {
        e.target.closest("." + classRemove) &&
          (e.target.closest("." + classRemove).parentNode.remove(),
          updateValue());
      }),
      input.addEventListener("keydown", (e) => {
        "" === input.value &&
          8 === e.keyCode &&
          wrapper.getElementsByClassName(classTag).length &&
          (wrapper.querySelector("." + classTag + ":last-of-type").remove(),
          updateValue());
      }),
      input.addEventListener("input", () => {
        addTag(), autowidth();
      }),
      input.addEventListener("blur", () => {
        addTag(!0), autowidth();
      }),
      autowidth(),
      el.addEventListener("change", () => updateTag());
  }
  window.addEventListener("DOMContentLoaded", async () => {
    const { default: a } = await import("tags.min.js");
    a.init();
    for (const a of document.querySelectorAll(".tagin")) tagin(a);
  });
};
