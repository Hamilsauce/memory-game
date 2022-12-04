export default `
<style id="debugger-style">
#debug {
  position: absolute;
  top: 300px;
  left: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 0px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  backdrop-filter: blur(30px) opacity(0.75) brightness(200%);
  z-index: 500;
  box-shadow: 0 0 4px 1px #00000057;
  overflow: hidden;
}

#debug-toggle {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0px;
  width: 50px;
  height: 50px;
  padding: 4px;
  border-radius: 50%;
  background: #1622A4;
  color: #DEDEDE;
  font-weight: 600;
  font-size: 14px;
  opacity: 0.8;
  z-index: 502;
  overflow: hidden;
  /* display: none; */
}

#debug-panel {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0px;
  width: 50px;
  height: 50px;
  padding: 4px;
  border-radius: 50%;
  background: #FFFFFF30;
  color: #DEDEDE;
  font-weight: 600;
  font-size: 14px;
  opacity: 0.8;
  z-index: 501;
  overflow: hidden;
}
</style>
`.trim();
