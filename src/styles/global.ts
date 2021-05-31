import { createGlobalStyle, css } from 'styled-components';
import { color, typography } from './styles';

export const bodyStyles = css`
  font-family: ${typography.type.primary};
  font-size: ${typography.size.s3}px;
  color: ${color.darkest};

  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.weight.regular};
    margin: 0;
    padding: 0;
  }

  button,
  input,
  textarea,
  select {
    font-family: ${typography.type.primary};
  }

  sub,
  sup {
    font-size: 0.8em;
  }

  sub {
    bottom: -0.2em;
  }

  sup {
    top: -0.2em;
  }

  b,
  em {
    font-weight: ${typography.weight.bold};
  }

  hr {
    border: none;
    border-top: 1px solid ${color.border};
    clear: both;
    margin-bottom: 1.25rem;
  }

  code,
  pre {
    font-family: ${typography.type.code};
    font-size: ${typography.size.s2 - 1}px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    display: inline-block;
    padding-left: 2px;
    padding-right: 2px;
    vertical-align: baseline;
    color: ${color.secondary};
  }

  pre {
    line-height: 18px;
    padding: 11px 1rem;
    white-space: pre-wrap;
    background: rgba(0, 0, 0, 0.05);
    color: ${color.darkest};
    border-radius: 3px;
    margin: 1rem 0;
  }

  &.ReactModal__Body--open {
    overflow: hidden;
    &.hide-intercom #intercom-container {
      display: none;
    }
  }

  .ReactModalPortal > div {
    opacity: 0;
  }

  .ReactModalPortal .ReactModal__Overlay {
    transition: all 200ms ease-in;

    &--after-open {
      opacity: 1;
    }
    &--before-close {
      opacity: 0;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    ${bodyStyles}
  }
  body,html {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height:auto;
    min-height:100%;
  }
  #root{
    min-height:100%;
    display:flex;
    flex-grow: 1;
  }
  .app_layout_container{
    flex-grow:1;
  }
  .app_layout_content{
    margin: 0 16px;
    overflow: initial;
    flex: 1 1;
    min-height: auto;
  }
  // prevent mouse-clicks from focusing elements
  // this removes the ugly blue outline
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #F5F5F5;
}
/* 外层轨道 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
  border-radius: 6px;
  background-color: #F5F5F5;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  height: 12px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
::-webkit-scrollbar-thumb:window-inactive {
  background-color: #555;
}
`;
