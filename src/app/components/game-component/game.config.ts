import { Vector2 } from './game-classes/vector2';
import { Rectangle } from './game-classes/rectangle';

export class GameConfig{
    public static readonly game_image_path = "./app/components/game-component/game-images/";
    public static debugMode = true;
    public static worldCamera: Vector2 = new Vector2(0,0);
    public static worldCameraSize: Rectangle = new Rectangle(200,200,400,300);
    public static testData = true; //Turn false if you want data from server
}