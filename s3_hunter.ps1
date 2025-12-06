
Write-Host "=== S3/MinIO Hunter ===" -ForegroundColor Cyan


Write-Host "`n[*] Checking Docker containers..." -ForegroundColor Yellow
try {
    docker ps -a | Select-String -Pattern "minio|s3"
    docker images | Select-String -Pattern "minio|s3"
} catch {
    Write-Host "    Docker not available or not running" -ForegroundColor Red
}


Write-Host "`n[*] Checking environment variables..." -ForegroundColor Yellow
Get-ChildItem Env: | Where-Object { $_.Name -match "S3|AWS|MINIO" }


Write-Host "`n[*] Checking for AWS credentials..." -ForegroundColor Yellow
$awsPaths = @(
    "$env:USERPROFILE\.aws\credentials",
    "$env:USERPROFILE\.aws\config",
    "C:\Users\*\.aws\credentials"
)
foreach ($path in $awsPaths) {
    if (Test-Path $path) {
        Write-Host "    FOUND: $path" -ForegroundColor Green
        Get-Content $path
    }
}

Write-Host "`n[*] Searching for config files..." -ForegroundColor Yellow
$searchPaths = @("C:\", "C:\Users", "C:\ProgramData", "C:\inetpub")
$patterns = @("*s3*", "*minio*", "*aws*", "*.env")

foreach ($sp in $searchPaths) {
    if (Test-Path $sp) {
        Get-ChildItem -Path $sp -Recurse -Include $patterns -ErrorAction SilentlyContinue 2>$null | 
        Select-Object FullName | ForEach-Object {
            Write-Host "    FOUND: $($_.FullName)" -ForegroundColor Green
        }
    }
}


Write-Host "`n[*] Searching file contents for S3 references..." -ForegroundColor Yellow
$searchDirs = @("C:\Users", "C:\inetpub", "C:\ProgramData")
foreach ($dir in $searchDirs) {
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -Recurse -Include "*.json","*.xml","*.config","*.env","*.yaml","*.yml","*.ini","*.txt" -ErrorAction SilentlyContinue 2>$null |
        Select-String -Pattern "s3\.amazonaws|minio|AKIA[A-Z0-9]{16}|aws_access_key|endpoint.*s3" -ErrorAction SilentlyContinue |
        Select-Object Path, LineNumber, Line
    }
}

Write-Host "`n[*] Checking running processes..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.Name -match "minio|s3" }


Write-Host "`n[*] Checking for MinIO ports (9000, 9001)..." -ForegroundColor Yellow
netstat -an | Select-String ":9000|:9001"

Write-Host "`n=== Scan Complete ===" -ForegroundColor Cyan
