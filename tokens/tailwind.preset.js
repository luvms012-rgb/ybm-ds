// YBM Design System — Tailwind preset
// ⚠ tokens/build.mjs 가 생성한다. 직접 고치지 말 것. 생성: 2026-10-27
// 모든 값이 CSS 변수를 가리키므로 ybm-ds.css 를 함께 로드해야 동작한다.
// tailwind.config.js → module.exports = { presets: [require('./tokens/tailwind.preset.js')], … }

module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray": {
          "00": "var(--ybm-color-palette-gray-00)",
          "100": "var(--ybm-color-palette-gray-100)",
          "200": "var(--ybm-color-palette-gray-200)",
          "300": "var(--ybm-color-palette-gray-300)",
          "400": "var(--ybm-color-palette-gray-400)",
          "500": "var(--ybm-color-palette-gray-500)",
          "600": "var(--ybm-color-palette-gray-600)",
          "700": "var(--ybm-color-palette-gray-700)",
          "800": "var(--ybm-color-palette-gray-800)",
          "900": "var(--ybm-color-palette-gray-900)",
          "1000": "var(--ybm-color-palette-gray-1000)"
        },
        "brand": {
          "100": "var(--ybm-color-palette-brand-100)",
          "200": "var(--ybm-color-palette-brand-200)",
          "300": "var(--ybm-color-palette-brand-300)",
          "400": "var(--ybm-color-palette-brand-400)",
          "500": "var(--ybm-color-palette-brand-500)",
          "600": "var(--ybm-color-palette-brand-600)",
          "700": "var(--ybm-color-palette-brand-700)",
          "800": "var(--ybm-color-palette-brand-800)",
          "900": "var(--ybm-color-palette-brand-900)",
          "1000": "var(--ybm-color-palette-brand-1000)"
        },
        "blue": {
          "100": "var(--ybm-color-palette-blue-100)",
          "200": "var(--ybm-color-palette-blue-200)",
          "300": "var(--ybm-color-palette-blue-300)",
          "400": "var(--ybm-color-palette-blue-400)",
          "500": "var(--ybm-color-palette-blue-500)",
          "600": "var(--ybm-color-palette-blue-600)",
          "700": "var(--ybm-color-palette-blue-700)",
          "800": "var(--ybm-color-palette-blue-800)",
          "900": "var(--ybm-color-palette-blue-900)",
          "1000": "var(--ybm-color-palette-blue-1000)"
        },
        "green": {
          "100": "var(--ybm-color-palette-green-100)",
          "200": "var(--ybm-color-palette-green-200)",
          "300": "var(--ybm-color-palette-green-300)",
          "400": "var(--ybm-color-palette-green-400)",
          "500": "var(--ybm-color-palette-green-500)",
          "600": "var(--ybm-color-palette-green-600)",
          "700": "var(--ybm-color-palette-green-700)",
          "800": "var(--ybm-color-palette-green-800)",
          "900": "var(--ybm-color-palette-green-900)",
          "1000": "var(--ybm-color-palette-green-1000)"
        },
        "orange": {
          "100": "var(--ybm-color-palette-orange-100)",
          "200": "var(--ybm-color-palette-orange-200)",
          "300": "var(--ybm-color-palette-orange-300)",
          "400": "var(--ybm-color-palette-orange-400)",
          "500": "var(--ybm-color-palette-orange-500)",
          "600": "var(--ybm-color-palette-orange-600)",
          "700": "var(--ybm-color-palette-orange-700)",
          "800": "var(--ybm-color-palette-orange-800)",
          "900": "var(--ybm-color-palette-orange-900)",
          "1000": "var(--ybm-color-palette-orange-1000)"
        },
        "yellow": {
          "100": "var(--ybm-color-palette-yellow-100)",
          "200": "var(--ybm-color-palette-yellow-200)",
          "300": "var(--ybm-color-palette-yellow-300)",
          "400": "var(--ybm-color-palette-yellow-400)",
          "500": "var(--ybm-color-palette-yellow-500)",
          "600": "var(--ybm-color-palette-yellow-600)",
          "700": "var(--ybm-color-palette-yellow-700)",
          "800": "var(--ybm-color-palette-yellow-800)",
          "900": "var(--ybm-color-palette-yellow-900)",
          "1000": "var(--ybm-color-palette-yellow-1000)"
        },
        "purple": {
          "100": "var(--ybm-color-palette-purple-100)",
          "200": "var(--ybm-color-palette-purple-200)",
          "300": "var(--ybm-color-palette-purple-300)",
          "400": "var(--ybm-color-palette-purple-400)",
          "500": "var(--ybm-color-palette-purple-500)",
          "600": "var(--ybm-color-palette-purple-600)",
          "700": "var(--ybm-color-palette-purple-700)",
          "800": "var(--ybm-color-palette-purple-800)",
          "900": "var(--ybm-color-palette-purple-900)",
          "1000": "var(--ybm-color-palette-purple-1000)"
        },
        "red": {
          "100": "var(--ybm-color-palette-red-100)",
          "200": "var(--ybm-color-palette-red-200)",
          "300": "var(--ybm-color-palette-red-300)",
          "400": "var(--ybm-color-palette-red-400)",
          "500": "var(--ybm-color-palette-red-500)",
          "600": "var(--ybm-color-palette-red-600)",
          "700": "var(--ybm-color-palette-red-700)",
          "800": "var(--ybm-color-palette-red-800)",
          "900": "var(--ybm-color-palette-red-900)",
          "1000": "var(--ybm-color-palette-red-1000)"
        },
        "static": {
          "white": "var(--ybm-color-palette-static-white)",
          "black": "var(--ybm-color-palette-static-black)",
          "black-alpha-100": "var(--ybm-color-palette-static-black-alpha-100)",
          "black-alpha-200": "var(--ybm-color-palette-static-black-alpha-200)",
          "black-alpha-300": "var(--ybm-color-palette-static-black-alpha-300)",
          "black-alpha-400": "var(--ybm-color-palette-static-black-alpha-400)",
          "black-alpha-500": "var(--ybm-color-palette-static-black-alpha-500)",
          "black-alpha-600": "var(--ybm-color-palette-static-black-alpha-600)",
          "black-alpha-700": "var(--ybm-color-palette-static-black-alpha-700)",
          "black-alpha-800": "var(--ybm-color-palette-static-black-alpha-800)",
          "black-alpha-900": "var(--ybm-color-palette-static-black-alpha-900)",
          "black-alpha-1000": "var(--ybm-color-palette-static-black-alpha-1000)",
          "white-alpha-50": "var(--ybm-color-palette-static-white-alpha-50)",
          "white-alpha-100": "var(--ybm-color-palette-static-white-alpha-100)",
          "white-alpha-200": "var(--ybm-color-palette-static-white-alpha-200)",
          "white-alpha-300": "var(--ybm-color-palette-static-white-alpha-300)",
          "white-alpha-400": "var(--ybm-color-palette-static-white-alpha-400)",
          "white-alpha-500": "var(--ybm-color-palette-static-white-alpha-500)",
          "white-alpha-600": "var(--ybm-color-palette-static-white-alpha-600)",
          "white-alpha-700": "var(--ybm-color-palette-static-white-alpha-700)",
          "white-alpha-800": "var(--ybm-color-palette-static-white-alpha-800)",
          "white-alpha-900": "var(--ybm-color-palette-static-white-alpha-900)",
          "white-alpha-1000": "var(--ybm-color-palette-static-white-alpha-1000)"
        },
        "logo": {
          "ybm-blue": "var(--ybm-color-logo-ybm-blue)",
          "ybm-gray": "var(--ybm-color-logo-ybm-gray)",
          "ybm-red": "var(--ybm-color-logo-ybm-red)"
        },
        "bg": {
          "brand-solid": "var(--ybm-color-bg-brand-solid)",
          "brand-solid-pressed": "var(--ybm-color-bg-brand-solid-pressed)",
          "brand-weak": "var(--ybm-color-bg-brand-weak)",
          "brand-weak-pressed": "var(--ybm-color-bg-brand-weak-pressed)",
          "canvas": "var(--ybm-color-bg-canvas)",
          "critical-solid": "var(--ybm-color-bg-critical-solid)",
          "critical-solid-pressed": "var(--ybm-color-bg-critical-solid-pressed)",
          "critical-weak": "var(--ybm-color-bg-critical-weak)",
          "critical-weak-pressed": "var(--ybm-color-bg-critical-weak-pressed)",
          "disabled": "var(--ybm-color-bg-disabled)",
          "informative-solid": "var(--ybm-color-bg-informative-solid)",
          "informative-solid-pressed": "var(--ybm-color-bg-informative-solid-pressed)",
          "informative-weak": "var(--ybm-color-bg-informative-weak)",
          "informative-weak-pressed": "var(--ybm-color-bg-informative-weak-pressed)",
          "layer-default": "var(--ybm-color-bg-layer-default)",
          "layer-floating": "var(--ybm-color-bg-layer-floating)",
          "magic-solid": "var(--ybm-color-bg-magic-solid)",
          "magic-solid-pressed": "var(--ybm-color-bg-magic-solid-pressed)",
          "magic-weak": "var(--ybm-color-bg-magic-weak)",
          "magic-weak-pressed": "var(--ybm-color-bg-magic-weak-pressed)",
          "neutral": "var(--ybm-color-bg-neutral)",
          "neutral-inverted": "var(--ybm-color-bg-neutral-inverted)",
          "neutral-inverted-pressed": "var(--ybm-color-bg-neutral-inverted-pressed)",
          "neutral-muted": "var(--ybm-color-bg-neutral-muted)",
          "neutral-solid": "var(--ybm-color-bg-neutral-solid)",
          "neutral-solid-pressed": "var(--ybm-color-bg-neutral-solid-pressed)",
          "neutral-subtle": "var(--ybm-color-bg-neutral-subtle)",
          "neutral-weak-alpha": "var(--ybm-color-bg-neutral-weak-alpha)",
          "neutral-weak-alpha-pressed": "var(--ybm-color-bg-neutral-weak-alpha-pressed)",
          "neutral-weak-pressed": "var(--ybm-color-bg-neutral-weak-pressed)",
          "overlay": "var(--ybm-color-bg-overlay)",
          "positive-solid": "var(--ybm-color-bg-positive-solid)",
          "positive-solid-pressed": "var(--ybm-color-bg-positive-solid-pressed)",
          "positive-weak": "var(--ybm-color-bg-positive-weak)",
          "positive-weak-pressed": "var(--ybm-color-bg-positive-weak-pressed)",
          "transparent": "var(--ybm-color-bg-transparent)",
          "transparent-pressed": "var(--ybm-color-bg-transparent-pressed)",
          "warning-solid": "var(--ybm-color-bg-warning-solid)",
          "warning-solid-pressed": "var(--ybm-color-bg-warning-solid-pressed)",
          "warning-weak": "var(--ybm-color-bg-warning-weak)",
          "warning-weak-pressed": "var(--ybm-color-bg-warning-weak-pressed)"
        },
        "fg": {
          "brand": "var(--ybm-color-fg-brand)",
          "brand-contrast": "var(--ybm-color-fg-brand-contrast)",
          "critical": "var(--ybm-color-fg-critical)",
          "critical-contrast": "var(--ybm-color-fg-critical-contrast)",
          "disabled": "var(--ybm-color-fg-disabled)",
          "informative": "var(--ybm-color-fg-informative)",
          "informative-contrast": "var(--ybm-color-fg-informative-contrast)",
          "magic": "var(--ybm-color-fg-magic)",
          "magic-contrast": "var(--ybm-color-fg-magic-contrast)",
          "neutral": "var(--ybm-color-fg-neutral)",
          "neutral-inverted": "var(--ybm-color-fg-neutral-inverted)",
          "neutral-muted": "var(--ybm-color-fg-neutral-muted)",
          "neutral-subtle": "var(--ybm-color-fg-neutral-subtle)",
          "on-brand-solid": "var(--ybm-color-fg-on-brand-solid)",
          "on-critical-solid": "var(--ybm-color-fg-on-critical-solid)",
          "on-informative-solid": "var(--ybm-color-fg-on-informative-solid)",
          "on-magic-solid": "var(--ybm-color-fg-on-magic-solid)",
          "on-neutral-solid": "var(--ybm-color-fg-on-neutral-solid)",
          "on-positive-solid": "var(--ybm-color-fg-on-positive-solid)",
          "on-warning-solid": "var(--ybm-color-fg-on-warning-solid)",
          "placeholder": "var(--ybm-color-fg-placeholder)",
          "positive": "var(--ybm-color-fg-positive)",
          "positive-contrast": "var(--ybm-color-fg-positive-contrast)",
          "warning": "var(--ybm-color-fg-warning)",
          "warning-contrast": "var(--ybm-color-fg-warning-contrast)"
        },
        "stroke": {
          "brand-solid": "var(--ybm-color-stroke-brand-solid)",
          "brand-weak": "var(--ybm-color-stroke-brand-weak)",
          "critical-solid": "var(--ybm-color-stroke-critical-solid)",
          "critical-weak": "var(--ybm-color-stroke-critical-weak)",
          "focus-ring": "var(--ybm-color-stroke-focus-ring)",
          "informative-solid": "var(--ybm-color-stroke-informative-solid)",
          "informative-weak": "var(--ybm-color-stroke-informative-weak)",
          "magic-solid": "var(--ybm-color-stroke-magic-solid)",
          "magic-weak": "var(--ybm-color-stroke-magic-weak)",
          "neutral": "var(--ybm-color-stroke-neutral)",
          "neutral-contrast": "var(--ybm-color-stroke-neutral-contrast)",
          "neutral-muted": "var(--ybm-color-stroke-neutral-muted)",
          "neutral-solid": "var(--ybm-color-stroke-neutral-solid)",
          "neutral-subtle": "var(--ybm-color-stroke-neutral-subtle)",
          "neutral-weak": "var(--ybm-color-stroke-neutral-weak)",
          "positive-solid": "var(--ybm-color-stroke-positive-solid)",
          "positive-weak": "var(--ybm-color-stroke-positive-weak)",
          "warning-solid": "var(--ybm-color-stroke-warning-solid)",
          "warning-weak": "var(--ybm-color-stroke-warning-weak)"
        },
        "chart": {
          "series-1": "var(--ybm-color-chart-series-1)",
          "series-2": "var(--ybm-color-chart-series-2)",
          "series-3": "var(--ybm-color-chart-series-3)",
          "series-4": "var(--ybm-color-chart-series-4)",
          "series-5": "var(--ybm-color-chart-series-5)"
        }
      },
      "spacing": {
        "x0": "var(--ybm-space-x0)",
        "x0_5": "var(--ybm-space-x0_5)",
        "x1": "var(--ybm-space-x1)",
        "x1_5": "var(--ybm-space-x1_5)",
        "x2": "var(--ybm-space-x2)",
        "x2_5": "var(--ybm-space-x2_5)",
        "x3": "var(--ybm-space-x3)",
        "x3_5": "var(--ybm-space-x3_5)",
        "x4": "var(--ybm-space-x4)",
        "x4_5": "var(--ybm-space-x4_5)",
        "x5": "var(--ybm-space-x5)",
        "x6": "var(--ybm-space-x6)",
        "x7": "var(--ybm-space-x7)",
        "x8": "var(--ybm-space-x8)",
        "x9": "var(--ybm-space-x9)",
        "x10": "var(--ybm-space-x10)",
        "x11": "var(--ybm-space-x11)",
        "x12": "var(--ybm-space-x12)",
        "x13": "var(--ybm-space-x13)",
        "x14": "var(--ybm-space-x14)",
        "x15": "var(--ybm-space-x15)",
        "x16": "var(--ybm-space-x16)",
        "x18": "var(--ybm-space-x18)",
        "x20": "var(--ybm-space-x20)",
        "x24": "var(--ybm-space-x24)",
        "x32": "var(--ybm-space-x32)"
      },
      "borderRadius": {
        "r0": "var(--ybm-radius-r0)",
        "r0_5": "var(--ybm-radius-r0_5)",
        "r1": "var(--ybm-radius-r1)",
        "r1_5": "var(--ybm-radius-r1_5)",
        "r2": "var(--ybm-radius-r2)",
        "r2_5": "var(--ybm-radius-r2_5)",
        "r3": "var(--ybm-radius-r3)",
        "r3_5": "var(--ybm-radius-r3_5)",
        "r4": "var(--ybm-radius-r4)",
        "r5": "var(--ybm-radius-r5)",
        "r6": "var(--ybm-radius-r6)",
        "r8": "var(--ybm-radius-r8)",
        "full": "var(--ybm-radius-full)",
        "shape-2xs": "var(--ybm-shape-2xs)",
        "shape-xs": "var(--ybm-shape-xs)",
        "shape-sm": "var(--ybm-shape-sm)",
        "shape-md": "var(--ybm-shape-md)",
        "shape-lg": "var(--ybm-shape-lg)",
        "shape-xl": "var(--ybm-shape-xl)",
        "shape-2xl": "var(--ybm-shape-2xl)",
        "shape-3xl": "var(--ybm-shape-3xl)",
        "shape-pill": "var(--ybm-shape-pill)"
      },
      "fontSize": {
        "t01": [
          "var(--ybm-font-size-t01)",
          {
            "lineHeight": "var(--ybm-line-height-t01)"
          }
        ],
        "t02": [
          "var(--ybm-font-size-t02)",
          {
            "lineHeight": "var(--ybm-line-height-t02)"
          }
        ],
        "t03": [
          "var(--ybm-font-size-t03)",
          {
            "lineHeight": "var(--ybm-line-height-t03)"
          }
        ],
        "t04": [
          "var(--ybm-font-size-t04)",
          {
            "lineHeight": "var(--ybm-line-height-t04)"
          }
        ],
        "t05": [
          "var(--ybm-font-size-t05)",
          {
            "lineHeight": "var(--ybm-line-height-t05)"
          }
        ],
        "t06": [
          "var(--ybm-font-size-t06)",
          {
            "lineHeight": "var(--ybm-line-height-t06)"
          }
        ],
        "t07": [
          "var(--ybm-font-size-t07)",
          {
            "lineHeight": "var(--ybm-line-height-t07)"
          }
        ],
        "t08": [
          "var(--ybm-font-size-t08)",
          {
            "lineHeight": "var(--ybm-line-height-t08)"
          }
        ],
        "t09": [
          "var(--ybm-font-size-t09)",
          {
            "lineHeight": "var(--ybm-line-height-t09)"
          }
        ],
        "t10": [
          "var(--ybm-font-size-t10)",
          {
            "lineHeight": "var(--ybm-line-height-t10)"
          }
        ],
        "t11": [
          "var(--ybm-font-size-t11)",
          {
            "lineHeight": "var(--ybm-line-height-t11)"
          }
        ],
        "t12": [
          "var(--ybm-font-size-t12)",
          {
            "lineHeight": "var(--ybm-line-height-t12)"
          }
        ],
        "t13": [
          "var(--ybm-font-size-t13)",
          {
            "lineHeight": "var(--ybm-line-height-t13)"
          }
        ],
        "t14": [
          "var(--ybm-font-size-t14)",
          {
            "lineHeight": "var(--ybm-line-height-t14)"
          }
        ],
        "t15": [
          "var(--ybm-font-size-t15)",
          {
            "lineHeight": "var(--ybm-line-height-t15)"
          }
        ],
        "t16": [
          "var(--ybm-font-size-t16)",
          {
            "lineHeight": "var(--ybm-line-height-t16)"
          }
        ],
        "t17": [
          "var(--ybm-font-size-t17)",
          {
            "lineHeight": "var(--ybm-line-height-t17)"
          }
        ]
      },
      "boxShadow": {
        "1": "var(--ybm-elevation-1)",
        "2": "var(--ybm-elevation-2)",
        "3": "var(--ybm-elevation-3)",
        "4": "var(--ybm-elevation-4)",
        "5": "var(--ybm-elevation-5)",
        "raised": "var(--ybm-elevation-raised)",
        "overlay": "var(--ybm-elevation-overlay)",
        "panel": "var(--ybm-elevation-panel)",
        "floating": "var(--ybm-elevation-floating)",
        "modal": "var(--ybm-elevation-modal)"
      },
      "fontFamily": {
        "sans": [
          "var(--ybm-font-family-base)"
        ]
      },
      "fontWeight": {
        "regular": "var(--ybm-font-weight-regular)",
        "medium": "var(--ybm-font-weight-medium)",
        "semibold": "var(--ybm-font-weight-semibold)",
        "bold": "var(--ybm-font-weight-bold)"
      },
      "transitionDuration": {
        "fast": "var(--ybm-duration-fast)",
        "normal": "var(--ybm-duration-normal)",
        "slow": "var(--ybm-duration-slow)"
      },
      "transitionTimingFunction": {
        "standard": "var(--ybm-easing-standard)",
        "emphasized": "var(--ybm-easing-emphasized)"
      },
      "zIndex": {
        "base": "var(--ybm-z-base)",
        "sticky": "var(--ybm-z-sticky)",
        "overlay": "var(--ybm-z-overlay)",
        "dialog": "var(--ybm-z-dialog)",
        "toast": "var(--ybm-z-toast)",
        "tooltip": "var(--ybm-z-tooltip)"
      }
    }
  },
  "darkMode": [
    "selector",
    "[data-theme=\"dark\"]"
  ]
};
