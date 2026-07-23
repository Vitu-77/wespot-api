import { S3_WORKSPACE_FOLDERS } from "src/shared/constants/s3-workspace-folders";
import { createWorkspaceDirname } from "src/shared/utils/create-workspace-dirname";
import { workspaceEntityBuilder } from "test/builders/workspace.builder";

const workspace = workspaceEntityBuilder.build({ name: "Fake Workspace" });

describe("createWorkspaceDirname", () => {
  it("should create base workspace folder with workspace slug", () => {
    const dirname = createWorkspaceDirname(workspace);
    expect(dirname.startsWith("fake_workspace")).toBeTruthy();
  });

  it("should create BRAND_LOGOS folder ", () => {
    const dirname = createWorkspaceDirname(workspace, "BRAND_LOGOS");
    expect(dirname.endsWith(S3_WORKSPACE_FOLDERS.BRAND_LOGOS)).toBeTruthy();
  });

  it("should create SOUNDTRACKS folder ", () => {
    const dirname = createWorkspaceDirname(workspace, "SOUNDTRACKS");
    expect(dirname.endsWith(S3_WORKSPACE_FOLDERS.SOUNDTRACKS)).toBeTruthy();
  });

  it("should create SPOTS folder ", () => {
    const dirname = createWorkspaceDirname(workspace, "SPOTS");
    expect(dirname.endsWith(S3_WORKSPACE_FOLDERS.SPOTS)).toBeTruthy();
  });

  it("should create VOICE_SAMPLES folder ", () => {
    const dirname = createWorkspaceDirname(workspace, "VOICE_SAMPLES");
    expect(dirname.endsWith(S3_WORKSPACE_FOLDERS.VOICE_SAMPLES)).toBeTruthy();
  });
});
