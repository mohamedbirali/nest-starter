import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CvProposalDto {
  @IsNotEmpty()
  @IsString()
  entreprise_name: string;
  @IsNotEmpty()
  @IsString()
  entreprise_mail: string;
  @IsOptional()
  @IsString()
  entreprise_market_value: string;
  @IsUrl()
  @IsOptional()
  entreprise_logo: string;
  @IsOptional()
  @IsString()
  entreprise_adresse: string;
  @IsString()
  @IsOptional()
  employee_name: string;
  @IsOptional()
  @IsBoolean()
  is_answered: boolean;

  @IsEmail()
  @IsNotEmpty()
  condidate_mail: string;
  @IsNotEmpty()
  @IsString()
  diplome_name: string;
  @IsNotEmpty()
  @IsString()
  university_name: string;
  @IsNotEmpty()
  @IsString()
  project_type: string;

  @IsOptional()
  @IsString()
  found_in: string;
}
