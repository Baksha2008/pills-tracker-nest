import { ApiModelProperty } from "@nestjs/swagger";

export class CreatePillDto {
  @ApiModelProperty()
  readonly id!: string;

  @ApiModelProperty()
  readonly name!: string;

  @ApiModelProperty()
  readonly type!: string;

  @ApiModelProperty()
  readonly dose!: string;

  @ApiModelProperty()
  readonly userId!: string;
}
