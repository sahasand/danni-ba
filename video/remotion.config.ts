import {Config} from '@remotion/cli/config';

// El navegador que trae Remotion se queda colgado en esta Mac (macOS 27),
// así que se usa el Chrome instalado. En otra máquina se pueden borrar estas dos líneas.
Config.setBrowserExecutable('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
Config.setChromeMode('chrome-for-testing');
