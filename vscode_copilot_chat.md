# Architecture of GitHub Copilot Chat Extension

- github copilot API https://github.com/microsoft/vscode-copilot-chat/blob/2173cc58d67cb533facd6a936f99b200346617b0/src/extension/typescriptContext/vscode-node/languageContextService.ts#L18


## edit tool

- https://github.com/microsoft/vscode-copilot-chat/blob/2173cc58d67cb533facd6a936f99b200346617b0/src/extension/tools/node/replaceStringTool.tsx
- https://github.com/microsoft/vscode-copilot-chat/blob/2173cc58d67cb533facd6a936f99b200346617b0/src/extension/tools/node/insertEditTool.tsx

- chatParticipantPrivate mappedEditsProvider https://github.com/microsoft/vscode-copilot-chat/blob/2173cc58d67cb533facd6a936f99b200346617b0/package.json#L108C4-L108C23

- chatParticipantPrivate flag https://github.com/Microsoft/vscode/blob/0ac8174fbcf3ac0bfb41b32e498d336f604dd9af/src/vs/workbench/api/common/extHostLanguageModelTools.ts#L147
